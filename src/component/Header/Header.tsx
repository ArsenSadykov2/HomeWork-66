import ToolBar from "../ToolBar/ToolBar.tsx";
import {PropsWithChildren} from "react";


const Header: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <header className="mb-4">
                <ToolBar/>
            </header>
            <main>
                {children}
            </main>
        </>
    );
};

export default Header;