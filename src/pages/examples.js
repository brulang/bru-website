import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ShikiCodeBlock from 'components/ShikiCodeBlock';
import Link from 'next/link';
import { highlight } from 'lib/shiki'
import GlobalStyle from '../globalStyles';

export default function Examples({
  packageJson,
  requestBru,
  openapiYml,
  openapiBru
}) {
  return (
    <div className="container flex flex-col root home-page" style={{fontFamily: 'Inter', maxWidth: '1024px'}}>
      <Head>
        <title>bru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />

      <main className="flex flex-grow flex-col notebase-app px-4">
        <Navbar />

        <div>
          <p className='mt-4'>
            Here are some examples of Bru syntax. We are not recommending that below structures must be bru files. These are just examples to show how Bru can be used.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-4 text-yellow-600">package.json</h2>
          <ShikiCodeBlock html={packageJson}/>

          <h2 className="text-xl font-medium mt-8 mb-4 text-yellow-600">get-users.bru</h2>
          <ShikiCodeBlock html={requestBru}/>

          <h2 className="text-xl font-medium mt-8 mb-4 text-yellow-600">openapi.bru</h2>
          <div className='mt-2 mt-4'>
            For this example, we are also displaying the corresponding OpenAPI YAML file. This is to demonstrate how a markup lang with support for multimaps and annotations improves readability so much.
          </div>
          <ShikiCodeBlock html={openapiYml}/>
          <div className='mt-4'>
            <ShikiCodeBlock html={openapiBru}/>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export const getServerSideProps = async () => {
  const packageJson = `name: usebruno
private: true
workspaces: [
  packages/bruno-app
  packages/bruno-electron
  packages/bruno-cli
]
homepage: https://usebruno.com
devDependencies: {
  husky: 8.0.3
  jest: 29.2.0
}
scripts: {
  prepare: 'husky install'
}
overrides {
  rollup: 3.2.5
}`;

const requestBru = `meta: {
  name: Create User
  type: http
  seq: 1
}

http: {
  method: POST
  url: https://www.usebruno.com/api/v1/users
  headers: {
    Content-Type: application/json
  }
  body: {
    type: json
    data: '''
      {
        "email": "admin@usebruno.com",
        "password": "password"
      }
    '''
  }
}

pre-request-script: '''
  let token = bru.getEnvVar('token'));
  bru.setHeader('Authorization', 'Bearer ' + token);
'''

tests: '''
  test("should create a user", () => {
    expect(res.getStatus()).to.equal(200);
  });

  test("should return a user", () => {
    const data = res.getBody();
    expect(data).to.have.property('id');
    expect(data).to.have.property('email');
  }
'''
`;

  const openapiYml = `openapi: 3.0.0
info:
  title: Todo API
  version: 1.0.0
paths:
  /todos:
    get:
      summary: Retrieve all Todos
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              example:
                todos:
                  - id: 1
                    title: "Complete assignment"
                    completed: false
                  - id: 2
                    title: "Buy groceries"
                    completed: true
    post:
      summary: Create a new Todo
      requestBody:
        required: true
        content:
          application/json:
            example:
              title: "New task"
              completed: false
      responses:
        '201':
          description: Todo created successfully
          content:
            application/json:
              example:
                id: 3
                title: "New task"
                completed: false
`;

  const openapiBru = `openapi: 3.0.0
info: {
  title: Todo API
  version: 1.0.0
}
paths: {
  '/todos': {
    @summary('Retrieve all Todos')
    get: {
      @description('Successful response')
      @status(200)
      @contentType('application/json')
      response: '''
        [{
          "id": 1,
          "title": "Complete assignment",
          "completed": false
        }, {
          "id": 2,
          "title": "Buy groceries",
          "completed": true
        }]
      '''

    @summary('Create a new Todo')
    post: {
      requestBody: '''
        {
          "title": "New task",
          "completed": false
        }
      '''
      @description('Todo created successfully')
      @status(201)
      @contentType('application/json')
      response: '''
        {
          "id": 3,
          "title": "New task",
          "completed": false
        }
      '''
    }
  }
}`;

  const highlightCode = async (code) => {
    const html = await highlight(
      code,
      'vitesse-light',
      'bash'
    );

    return html;
  };

  return {
    props: {
      packageJson: await highlightCode(packageJson),
      requestBru: await highlightCode(requestBru),
      openapiYml: await highlightCode(openapiYml),
      openapiBru: await highlightCode(openapiBru)
    }
  }
}