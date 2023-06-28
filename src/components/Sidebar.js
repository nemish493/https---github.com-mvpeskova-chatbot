import React from 'react';
import "../styles/style.css";


function addText(text_for_sidebar) {
    const area = document.getElementById("text");
    area.innerText = text_for_sidebar;
}

const Sidebar = (props) => {


    return (
        <div id="sidebar">
            <ul>
                <li>
                    <button className="bar" id="home">Home</button>
                </li>
                <li>
                    <button className="bar"
                            onClick={() => addText("Welcome to the movie bot page. " +
                                "This bot is designed to help you book a ticket for a screening of any movie that is shown in this cinema. Contributors:" +
                                " Nemish Kyada, Azbabanu Engineer, Don Binoy, Mariia Peskova")}>About
                        us
                    </button>
                </li>
                <li>
                    <button className="bar" onClick={() => addText('you can add your emails here:\n' +
         'Nemish Kyada: \nAzbabanu Engineer: \nDon Binoy: \nMariia Peskova: mariia.peskovaa@gmail.com')}>Contact
                    </button>
                </li>
                <button className="bar" id="dark_theme" onClick={props.func}>Change Mode</button>
            </ul>
            <p id="text">Welcome to the movie bot page.
                This bot is designed to help you book a ticket for a screening of any movie that is shown in this cinema.
                Contributors: Nemish Kyada, Azbabanu Engineer, Don Binoy, Mariia Peskova</p>
        </div>
    );
};

export default Sidebar;