import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>`btn btn-ghost ${isActive ? "bg-primary text-primary-content" : ""}`;

  return (
    <nav className="navbar bg-base-100 border-b border-base-300 px-4 md:px-8">
      <div className="navbar-start">
        <NavLink to="/" className="text-xl font-bold">
          Precious
        </NavLink>
      </div>

      <div className="navbar-end">
        <div className="hidden md:flex gap-2">
          <NavLink to="/marketplace" className={navLinkClass}>
            Marketplace
          </NavLink>

          <NavLink to="/community" className={navLinkClass}>
            Community
          </NavLink>

          <NavLink to="/collection" className={navLinkClass}>
            My Collection
          </NavLink>
        </div>

        <div className="dropdown dropdown-end md:hidden">
          <button tabIndex={0} className="btn btn-ghost btn-square">
            ☰
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-1 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <NavLink to="/marketplace">Marketplace</NavLink>
            </li>

            <li>
              <NavLink to="/community">Community</NavLink>
            </li>

            <li>
              <NavLink to="/collection">My Collection</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
