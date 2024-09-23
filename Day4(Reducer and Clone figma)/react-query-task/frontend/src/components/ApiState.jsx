export const ApiState = (Component) => {
  return (props) => {
    if (props.error) return <div className="color-danger">{props.error}</div>;
    if (props.isLoading) return <div>Loading</div>;
  
    return <Component {...props} />;
  };
};
