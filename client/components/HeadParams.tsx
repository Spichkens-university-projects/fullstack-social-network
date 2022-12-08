interface HeadProps {
    title: string
}

const HeadParams = ({title}: HeadProps) => {
    return (
        <>
		<title>{title}</title>
        </>
    )
}

export default HeadParams