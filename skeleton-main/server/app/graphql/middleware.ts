import { BaseContext } from '@apollo/server';
import { ExpressMiddlewareOptions } from '@apollo/server/dist/esm/express4';
import { GraphQLError } from 'graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PRIVATE_KEY } from '../libs/constant';
import User from '../models/User';
import { Maybe } from 'uk-fp';

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
      const token = Maybe.wrap(
        req?.headers?.authorization?.split(' ')[1]
      ).expect(graphqlError);

      const decoded = jwt.verify(token, PRIVATE_KEY) as JwtPayload;

      const user = Maybe.wrap(
        await User.findOne({ where: { id: decoded.id } })
      ).expect(graphqlError);

      // add the user to the context
      return { user: user.dataValues };
    } catch (err) {
      return { user: {} };
    }
  },
};

export default graphqlOption;
