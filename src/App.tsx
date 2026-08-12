import {Navbar} from "./components/Navbar"
import {PublicRoutes} from "./routes/PublicRoute"

export const App = () => {
  return (
    <>
    <Navbar/>
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <PublicRoutes />
    </main>
    </>
  )
}
