// Higher Order Componenets (HOC) - A component (HOC) that renders another component or Componenets
// the goal of an HOC is to be able to :
// 1)Reuse Code
// 2)Render hijacking
// 3)Prop Manipulation
// 4)Abstract State
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);


const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please dont share</p>}
      <WrappedComponent {...props} />
    </div>
  );
};


const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please Log in</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);



const AuthInfo = requireAuthentication(Info);




// ReactDOM.render(<AdminInfo isAdmin={true} info="This is the detail" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is the detail" />, document.getElementById('app'));
