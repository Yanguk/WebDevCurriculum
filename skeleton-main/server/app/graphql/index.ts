import { ApolloServer } from '@apollo/server';

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
    saveFile: (
      _: null,
      { file }: { file: { name: string; content: string } },
      contextValue: any
    ) => {
      if (!contextValue.user) return null;
      // todo: 파일 저장하기
      return file.name + file.content;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default apolloServer;
