const ShikiCodeBlock = ({ html }) => {
  return (
    <div className="bg-gray-100 p-4 rounded text-sm" style={{maxWidth: 600}}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default ShikiCodeBlock;
