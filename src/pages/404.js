import { Link } from "react-router-dom"

export default function Page404 () {
  return (
    <div className="page404">
      <h1>Page Not Found | <span>404</span></h1>
      <p>Page doesn't exist. Please check URL</p>
      <Link to="/">Back to Home Page</Link>
    </div>
  );
}