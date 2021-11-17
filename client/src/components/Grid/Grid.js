import './Grid.scss';

const Grid = ({ header, children }) => {
  return (
    <div className="grid_wrapper">
      <h1>{header}</h1>
      <div className="grid_content">{children}</div>
    </div>
  );
};

export default Grid;
