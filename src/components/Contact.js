import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Contact = () => {
    const instagram = <FontAwesomeIcon icon={faInstagram} style={{color: "#000000",}} size="2xl"/>
    const gitHub = <FontAwesomeIcon icon={faGithub} style={{color: "#000000",}} size="2xl"/>
    const linkedIn = <FontAwesomeIcon icon={faLinkedin} style={{color: "#000000",}} size="2xl"/>
    return (
    <div className="sup">
        <h1>Contact me!</h1>
        <h3>My name is Jakub Nowaczek and those are my social media</h3>
        <h4>It's my private portfolio project and all rights are reserved</h4>
        <div className="links">
            <a href="https://www.instagram.com/j_nowaczek30" target="_blank" rel="noreferrer" style={{margin: 20}}>{instagram}</a>
            <a href="https://www.github.com/hashelefe" target="_blank" rel="noreferrer" style={{margin: 20}}>{gitHub}</a>
            <a href="https://www.linkedin.com/in/jakub-nowaczek-a8b446247" target="_blank" rel="noreferrer" style={{margin: 20}}>{linkedIn}</a>
        </div>
    </div>
    )

}

export default Contact;