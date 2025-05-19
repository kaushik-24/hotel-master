import RequiredSign from './RequiredSign'

interface ILabel {
    name: string
    label: string
    textColor?: string
    textSize?: string
    fontSize?: string
    required?: boolean
}

const Label: React.FC<ILabel> = ({ name, label, required, textColor = "text-[#5b3423]", textSize = 'text-md', fontSize = 'font-medium' }) => {
    return (
        <label htmlFor={name} className={`font-poppins block ${textSize} ${textColor} ${fontSize} mb-2`}>
            {label} {required && <RequiredSign />}
        </label>
    )
}

export default Label
