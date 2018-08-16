import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';

const layout = (props) => (
    //<> = <Auxiliary> --> latest versions of React do have an in-build higher order component such as this
    <Auxiliary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Auxiliary>

);

export default layout; 