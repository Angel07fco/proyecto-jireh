import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ password }) => {

    const testResult = zxcvbn(password);

    const num = testResult.score * 100/4;

    const createPassLabel = () => {
        switch(testResult.score) {
        case 0:
            return 'Muy débil';
        case 1:
            return 'Débil';
        case 2:
            return 'Regular';
        case 3:
            return 'Bueno';
        case 4:
            return 'Fuerte';
        default:
            return '';
        }
    }

    const funcProgressColor = () => {
        switch(testResult.score) {
        case 0:
            return 'black';
        case 1:
            return 'red-500';
        case 2:
            return 'orange-500';
        case 3:
            return 'green-400';
        case 4:
            return 'green-600';
        default:
            return 'none';
        }
    }

    return (
        <>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className={`h-2.5 bg-${funcProgressColor()} rounded-full`} style={{width: `${num}%` }}></div>
        </div>

        <p className={`text-${funcProgressColor()-400} text-xs`}>
            {createPassLabel()}
        </p>
        </>
    )

}

export default PasswordStrengthMeter;