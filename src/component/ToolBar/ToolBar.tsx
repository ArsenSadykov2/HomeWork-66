import { NavLink } from 'react-router-dom';
const ToolBar = () => {
  return (
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0388ea' }}>
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Мой дневник питания
          </NavLink>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Главная
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/meals/new">
                Добавить запись
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default ToolBar;