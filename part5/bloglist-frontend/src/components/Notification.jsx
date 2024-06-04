const Notification = ({ message, errorMessage }) => {
 
  const looks = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (errorMessage) {
    return <div style={looks}>{errorMessage}</div>;
  }else{
    looks.color="green"
    return <div style={looks}>{message}</div>;
  }
  
};

export default Notification;
