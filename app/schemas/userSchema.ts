// src/schema.ts
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFieldConfig, ThunkObjMap, GraphQLNonNull, GraphQLSchema, } from 'graphql';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-express';
import { validateSignUpInput, validateLoginInput } from '../utils/auth';
import authMiddleware from '../utils/authMiddleware';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString! }
  },
});

const LoginUserType = new GraphQLObjectType({
  name: 'LoginUser',
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
});

const generateToken = (id: string, email: string) => {
  return jwt.sign(
    {
      id,
      email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const UserQueryFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(_parent, context, args) {
      const user = authMiddleware(context);
      return User.findById(args.id);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.find({});
    },
  },
}

const UserMutationFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  addUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(_parent, { name, email, password }) {
      const { valid, errors } = validateSignUpInput(name, email, password);
      console.log(valid, errors);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name,
        email,
        password: hashPassword, // Encrypte this password
      });
      const res = await user.save();
      // Generate JWT token
      const token = generateToken(res.id, res.email);
      console.log({
        id: res._id,
        name: res.name,
        email: res.email,
        token: token,
        ...user,
      });
      return {
        id: res._id,
        name: res.name,
        email: res.email,
        token: token,
      };
    },
  },
  login: {
    type: LoginUserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(_parent, { email, password }) {

      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ email });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }
      const token = generateToken(user.id, user.email);
      return {
        ...user,
        id: user._id,
        token
      };
    }
  },
};

export {
  UserQueryFields,
  UserMutationFields
};

