import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error404 = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">{error.status} - Oops!</h1>
        <p className="mt-2 text-gray-700">{error.data || "Algo salió mal."}</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">Error desconocido</h1>
      <p className="mt-2 text-gray-700">No se pudo cargar la página.</p>
    </div>
  );
};

export default Error404;