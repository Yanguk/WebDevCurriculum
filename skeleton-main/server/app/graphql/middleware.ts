import { BaseContext } from '@apollo/server';
import { ExpressMiddlewareOptions } from '@apollo/server/dist/esm/express4';
import { GraphQLError } from 'graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PRIVATE_KEY } from '../libs/constant';
import User from '../models/User';
import Some from '../types/Option';

const graphqlOption: ExpressMiddlewareOptions<BaseContext> = {
  context: async ({ req }) => {
    const graphqlError = new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });

    try {
      // get the user token from the headers
      const token = Some.wrapNull(
        req?.headers?.authorization?.split(' ')[1]
      ).expect(graphqlError);

      const decoded = jwt.verify(token, PRIVATE_KEY) as JwtPayload;

      const user = Some.wrapNull(
        await User.findOne({ where: { userId: decoded.id } })
      ).expect(graphqlError);

      // add the user to the context
      return { user: user.dataValues };
    } catch (err) {
      return { user: {} };
    }
  },
};

export default graphqlOption;
