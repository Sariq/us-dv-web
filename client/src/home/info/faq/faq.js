import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { withStyles } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import "./faq.scss"
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';


const useStyles = (theme => ({
    root: {
        width: '50%',
        margin: 'auto',
        marginBottom: '20px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));


class FAQ extends React.Component {

    state = {
        expand: false,
        faqsList: [
            {
                "title": "What is the Green Card (benefits)?",
                "text": <>                                    <div>
                    The green card is a permanent residency in the United States. This visa, also referred to as LPR (lawful permanent resident) grants its holders the rights of an American citizen and the option to become one as well. Applicant from different countries across the world seek out the LPR status in the U.S. for a variety of reasons, education, career and commonly immigration and overall stability.                </div>
                    <div>
                        The green card is a permanent residency in the United States. This visa, also referred to as LPR (lawful permanent resident) grants its holders the rights of an American citizen and the option to become one as well. Applicant from different countries across the world seek out the LPR status in the U.S. for a variety of reasons, education, career and commonly immigration and overall stability.
                </div></>,
                expand: false
            },
            {
                "title": "What are the requirements (Eligibility)?",
                "text": <>                         <div>
                The eligibly screening is based on 2 factors. The first one being born in an eligible country, please click here to view the list of eligible countries.                </div>
            <div>
                The second factor is Education, every applicant must have a minimum of a High School diploma or an equivalent of 12 years of education minimum.                </div>
            <div>
                To easily check your eligibility, Click here.
</div></>,
                expand: false
            },
            {
                "title": "Can I bring my family?",
                "text": <>                                    <div>
                Depends, if an applicant is married, then Yes. The applicant and their legal spouse will be included on the application. As per dependents (Children), they may also be included on the application as long as they are under the age of 21.                
                </div></>, 
                expand: false
            },
            {
                "title": "How to I apply?",
                "text": <> 
                <div>Submitting the application is through the Official DV Lottery website (dvprogram.state.gov). However, this option is only available during the month of October every year and will not provide an option to edit or change details, which can be crucial as mistakes can cause disqualification and failure to entry. As a solution, you can submit your application though us to give yourself the option to edit the application at any given moment, allow the application to be reviewed by experts prior to the submission and guarantee your participation. Click here to Apply. Submitting the application is through the Official DV Lottery website (dvprogram.state.gov). However, this option is only available during the month of October every year and will not provide an</div>

                <div>option to edit or change details, which can be crucial as mistakes can cause disqualification and failure to entry. As a solution, you can submit your application though us to give yourself the option to edit the application at any given moment, allow the application to be reviewed by experts prior to the submission and guarantee your participation. Click here to Apply.</div>                
                </>,
                expand: false
            },
            {
                "title": "What is the Case number?",
                "text": <> <div>
                This is a serial number that will appear on the confirmation letter that is send after confirmed submission and entry. This number is used later in checking the result and consular process.                </div>
            </>,
                expand: false
            },
            {
                "title": "Has my application been selected?",
                "text": <><div>
                When the application is submitted to the State Department, you will receive a confirmation letter which will contain a Case number. Applicants can check their status using this number on the State Department website on the month of May for the applications submitted in October of the previous year.                </div></>,
                expand: false
            },
            {
                "title": "How to get an interview in the embassy/consulate?",
                "text": <>         <div>
                Once an application is selected, the case needs to transferred to the next step. At this stage , applicants are required to submit their information, documents and confirmation letter to the KCC (Kentucky Consular Center). Once the documents have been reviewed, a letter will be sent with information regarding the dater time and location of the interview which is generally in the nearest embassy or consulate.                </div>
            <div>
                What information and documents are needed?
                            </div>
            <div>
                This can vary depending on the applicant's information and country. However, in all cases an applicant must submit the following
            <p>*Passports</p>

                <p>*Birth certificate</p>

                <p>*High school Diploma certificate</p>

                <p>*Criminal Clearance</p>

                <p>*Valid medical report</p>

                <p>*CIF (Customer information Files will be obtained and filled after the selection)</p>
            </div></>,
                expand: false
            },
            {
                "title": "Can I apply for a passport from the United States of America?",
                "text": `Yes, Green card holder or LPR Holders can apply for citizenship after 5 years residence in the U.S.`,
                expand: false
            },
            {
                "title": "How can you help me?",
                "text": <><div>
                    USA-DV Organization is established, managed and operated by immigration consultants with years of experience. We can help with all steps throughout the process, from filling the application review and submission, to guidance through the consular process and preparations of all documents. USA-DV Organization is established, managed and operated by immigration consultants with years of experience. We can help with all steps throughout the process, from filling the application review and submission, to guidance through the consular process and preparations of all documents.
            </div>
                    <div>
                        We encourage you to check out the full list of services by clicking here.
            </div>
                    <div>
                        **Please feel to submit your question here: ********************
            </div></>,
                expand: false
            }
        ]
    }
    expandSelectedFaq(idx) {
        const faqsList = this.state.faqsList.map((f, index) => {
            if (index === idx) {
                f.expand = !f.expand;
            }
            return f;
        })
        this.setState({ faqsList: faqsList })
    }
    render() {
        const { classes } = this.props;

        return (
            <div className="faq-container">

                <React.Fragment>

                    <main>
                        <div className="about-us-container">
                            <div className="main-title">FAQS</div>
                            {this.state.faqsList.map((f, idx) =>
                                <Card className={`paper-container ${classes.root} ${f.expand ? 'expand' : ''}`}>
                                    <CardContent className={`card-container`} onClick={() => this.expandSelectedFaq(idx)}>
                                        <div>
                                            {f.title}
                                        </div>
                                        <div>
                                            <ExpandMoreIcon  />
                                        </div>
                                    </CardContent>
                                    <Collapse in={f.expand} timeout="auto" unmountOnExit>
                                        <div className="card-content-container">
                                            {f.text}
                                        </div>
                                    </Collapse>
                                </Card>
                            )}
                        </div>
                    </main>
                </React.Fragment>
            </div>

        );
    }
}

export default withStyles(useStyles)(FAQ);
