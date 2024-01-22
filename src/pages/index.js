import Head from 'next/head';
import Bruno from "components/Bruno";
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ShikiCodeBlock from 'components/ShikiCodeBlock';
import Link from 'next/link';
import { highlight } from 'lib/shiki'
import GlobalStyle from '../globalStyles';

export default function Home({
  sampleBru,
  sampleMultimap,
  sampleArray,
  sampleMultistring,
  sampleAnnotations,
  sampleComments
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
          <div className='mt-8'>
            <Bruno width={100} />
          </div>
          <h2 className="text-3xl font-semibold mt-2 text-yellow-600">
            Bru Markup Language
          </h2>
          <p className='mt-8 mb-4'>
            Bru is a simple markup language with{' '}
            <a href="https://json.org" className="text-blue-500">
              JSON
            </a>
            -like semantics.
          </p>

          <p className='mb-8'>
            It's currently used in{' '}
            <a href="https://www.usebruno.com" className="text-blue-500">
              Bruno
            </a>{' '}
            to save details of an API request in a file.
          </p>

          <ShikiCodeBlock html={sampleBru}/>

          <h2 className="text-xl font-medium mt-8 text-yellow-600">Why</h2>
          <div className='mt-4'>
            The Bru syntax naturally evolved from our need to represent API requests in a human readable format in{' '}
            <a href="https://www.usebruno.com" className="text-blue-500">
              Bruno
            </a>{' '}.
            There were two key reasons we could not to use the big three - JSON, YAML and TOML:
          </div>
          <ul className="list-disc pl-6 space-y-1 ml-4 mt-4">
            <li className="list-item">The need for multimaps to represent duplicate keys</li>
            <li className="list-item">The need for annotations to ascribe additional information about a key-value pair</li>
          </ul>

          <h2 className="text-xl font-medium mt-8 text-yellow-600">Design Goals</h2>

          <ul className="list-disc pl-6 space-y-1 ml-4 mt-2">
            <li className="list-item">Human readable</li>
            <li className="list-item">Easy to represent <Link href="https://en.wikipedia.org/wiki/Here_document" className="link">multi-line strings</Link></li>
            <li className="list-item">Support duplicate keys in dictionary - <Link href="https://en.wikipedia.org/wiki/Multimap" className="link">Multimap</Link></li>
            <li className="list-item">Indentation based syntax</li>
            <li className="list-item"><Link href="https://en.wikipedia.org/wiki/Java_annotation" className="link">Annotations</Link> for providing additional information</li>
          </ul>

          <h2 className="text-xl font-medium mt-8 text-yellow-600">Data Types</h2>

          <h3 className="text-lg font-medium mt-6">Primitive Types</h3>
          <p className='mt-2'>There are 4 primitive types in Bru:</p>

          <ul className="list-disc pl-6 mt-2 space-y-1 ml-4">
            <li>String</li>
            <li>Number</li>
            <li>Boolean</li>
            <li>Null</li>
          </ul>

          <p style={{fontSize: 16}} className='mt-2'>
            The string type can be unquoted if it doesn't contain any special characters.
          </p>

          <h3 className="text-lg font-medium mt-6">Composite Types</h3>
          <p className='mt-2'>There are 3 composite types in Bru:</p>

          <ul className="list-disc pl-6 mt-2 space-y-1 ml-4">
            <li>Multimap</li>
            <li>Array</li>
            <li>Multistring</li>
          </ul>

          <h2 className="text-xl font-medium mt-8 text-yellow-600">Multimap</h2>
          <div className='mt-2 mb-4'>
            A Multimap is a dictionary (key-value pair) thet can have duplicate keys, enclosed in curly braces. Keys and Values are separated by a colon : and key-value pairs are separated by a newline.
            Values may be primitive or composite types.
          </div>

          <ShikiCodeBlock html={sampleMultimap}/>

          <h2 className="text-xl font-medium mt-8 text-yellow-600">Arrays</h2>
          <div className='mt-2 mb-4'>
            An Array is a list of values separated by a newline, enclosed in square brackets.
          </div>

          <ShikiCodeBlock html={sampleArray}/>

          <h2 className="text-xl font-medium mt-8 text-yellow-600">Multistring</h2>
          <div className='mt-2 mb-4'>
            A Multistring is a string that spans multiple lines, enclosed in triple single/double quotes. The content begins on the line after the opening quotes and ends on the line before the closing quotes.
          </div>

          <ShikiCodeBlock html={sampleMultistring}/>

          <h2 className="text-xl font-medium mt-8 text-yellow-600">Annotations</h2>
          <div className='mt-2 mb-4'>
          Annotations are used to ascribe additional information about a key-value pair. An annotation starts with @ and ends with a newline. Arguments may be passed to an annotation in parentheses and separated by commas. Only primitive types can be passed as arguments.
          </div>

          <ShikiCodeBlock html={sampleAnnotations}/>

          <h2 className="text-xl font-medium mt-8 text-yellow-600">Comments</h2>
          <div className='mt-2 mb-4'>
            Comments start with pound/hash - # and end with a newline. Inline comments are not supported.
          </div>

          <ShikiCodeBlock html={sampleComments}/>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export const getServerSideProps = async () => {
  const sampleBru = `http: {
  method: GET
  url: www.usebruno.com/hello
  headers: {
    Content-Type: application/json
  }
  body: {
    type: xml
    data: '''
      <xml>
        <name>Bru</name>
      </xml>
    '''
  }
}
`;

  const sampleMultimap = `http: {
  query: {
    userId: 1
    userId: 2
  }
}`;

  const sampleArray = `meta: {
  name: Get Users
  seq: 1
  tags: [
    sanity
    regression
  ]
}`;

  const sampleMultistring = `http: {
  body: {
    type: text
    data: '''
      This is a multiline string.
      It can span multiple lines.
    '''
  }
}`;

  const sampleAnnotations = `http: {
  method: 'GET'
  url: 'https://www.usebruno.com/hello'
  headers: {
    Content-Type: 'application/json'

    @disabled
    @description('This is a sample request')
    Authorization: 'Bearer{{token}}'
  }
  param: {
    query: {
      @description('The status of the user')
      @enum('active', 'inactive')
      status: 'active'
    }
  }
}`;

  const sampleComments = `# This is a comment

http: {
  # This is a comment, too
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
      sampleBru: await highlightCode(sampleBru),
      sampleMultimap: await highlightCode(sampleMultimap),
      sampleArray: await highlightCode(sampleArray),
      sampleMultistring: await highlightCode(sampleMultistring),
      sampleAnnotations: await highlightCode(sampleAnnotations),
      sampleComments: await highlightCode(sampleComments)
    }
  }
}