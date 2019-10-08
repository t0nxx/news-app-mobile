import React from 'react';
import { Container, Content, H1 } from 'native-base';
import HeaderComponent from '../components/Header';
const TermsScreen = ({ params, navigation }) => (
    <Container>
        <HeaderComponent title="Condations And Terms" navigation={navigation} />
        <Content style={{ marginHorizontal: 15, marginTop: 15 }}>
            <H1>
                لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

    أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد

    أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس

    أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت

    نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا

    كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم."
        </H1>
        </Content>
    </Container>
);

export default TermsScreen;
