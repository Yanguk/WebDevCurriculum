import { ApolloServer } from '@apollo/server';
import { File } from '../models';

const typeDefs = `#graphql
  type Query {
    hello: String
  }

  type Mutation {
    helloMu: String
    saveFile(file: SaveFile): String
  }

  input SaveFile {
    name: String
    content: String
  }

  type File {
    owner: String
    name: String
    content: String
    activeTab: Boolean
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world Good',
  },
  Mutation: {
    helloMu: () => 'test',
    saveFile: async (
      _: null,
      { file: { name, content } }: { file: { name: string; content: string } },
      contextValue: any
    ) => {
      if (!contextValue.user) return null;

      const { user } = contextValue;

      await File.create({
        owner: user.id,
        name,
        content,
        activeTab: true,
      });

      // todo: 파일 저장하기
      return 'success';
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default apolloServer;
