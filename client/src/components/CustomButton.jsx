import { Button } from '@material-tailwind/react';


const CustomButton = ({ hasFeature,
    featureCount,
    singleFeatureText,
    multipleFeatureText,
    noFeatureText,
    colorOn,
    colorOff,
    IconComponent }) => {


    let featureText;
    if (!hasFeature) {
        featureText = noFeatureText;
    } else {
        featureText = featureCount > 1 ? `${featureCount} ${multipleFeatureText}` : ` 1 ${singleFeatureText}`;
    }

    return (
        <Button className={`flex items-center gap-2 ${hasFeature ? colorOn : colorOff}`}>
            {IconComponent && <IconComponent size={20} />}
            {featureText}
        </Button>
    );
};


const SimpleFeatureButton = ({ text, color, IconComponent, onClick }) => {
    return (
        <Button onClick={onClick} className={`flex items-center gap-2 ${color}`}>
            {IconComponent && <IconComponent size={25} />}
            {text}
        </Button>
    );
};



export { CustomButton, SimpleFeatureButton }