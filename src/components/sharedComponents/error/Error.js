import React, { useEffect, useRef } from 'react';

const Error = (props) => {
  const { setError, error } = props;
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      const toast = new window.bootstrap.Toast(toastRef.current);
      toast.show();

      setTimeout(() => {
        toast.hide();
        setError(null);
      }, 5000);
    }
  }, [setError]);

  return (
    <div className='position-fixed bottom-0 start-50 translate-middle-x p-2'>
      <div
        ref={toastRef}
        className="toast align-items-center text-white bg-primary"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{error}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setError(null)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Error;
