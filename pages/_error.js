"use client"

function Error({ statusCode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 