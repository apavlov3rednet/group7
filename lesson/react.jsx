const ReactDOM = require('react-dom/client');

root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Привет мир</h1>);

function Logo(props) {
    return <img src="/images/logo.png" width={props.width} alt=""></img>;
}

const logo = <Logo width='40px'/>;
const logo2 = <Logo />;
const logo3 = <Logo />;
const logo4 = <Logo />;
const logo5 = <Logo />;

class Menu extends React.Component {
    render(props) {
        return <menu>{this.getMenu(props.active).toString}</menu>
    }

    getMenu(props) {
        let ar = {
            'owners' : 'Владельцы',
            'brands' : 'Бренды',
            'models' : 'Модели',
            'services' : 'Услуги',
            'objects' : 'Объекты',
        },
        list = [];

        for(let i in ar) {
            list.push(<li className={props.active == i ? 'active' : ''} dataRoute={i}>{ar[i]}</li>);
        }

        return list;
    }
}

class UserInfo extends React.Component {
    render(props) {
        if(props.user.auth) {
            <div className="UserInfo">
                <Avatar user={props.user} />
                <div className="UserInfo-name">
                    {props.user.fullName}
                </div>

                <a href='?logout=y'>Выйти</a>
            </div>
        }
        else {
            <div className="UserInfo-auth">
                <a href=''>Войти</a>
            </div>
        }
    }
}

class Header extends React.Component {
    render() {
        return <header>
            <Logo />
            <Menu />
            <UserInfo />
        </header>
    }
}

class Content extends React.Component {
    render() {
        return <div>{this.getContent}</div>
    }

    getContent() {
        return 'text'
    }
}

class App extends React.Component {

}

class Form extends React.Component {
    render(props) {
        return (
            <form name={props.name} id={props.id}>
                for(let i in props.elements) {
                    <input type={} />
                }
            </form>
        )
    }
}

root.render(<Header />);

export [App];