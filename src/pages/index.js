import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ShikiCodeBlock from 'components/ShikiCodeBlock';
import Link from 'next/link';
import { highlight } from 'lib/shiki'
import GlobalStyle from '../globalStyles';

export default function Home({
  highlightedHtml
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
          <p className='my-4'>
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

          <ShikiCodeBlock html={highlightedHtml}/>

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

        </div>
      </main>
      <Footer/>
    </div>
  );
};

export const getServerSideProps = async () => {
  const code = `http: {
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
`
  const html = await highlight(
    code,
    'vitesse-light',
    'groovy'
  )

  return {
    props: {
      highlightedHtml: html
    }
  }
}