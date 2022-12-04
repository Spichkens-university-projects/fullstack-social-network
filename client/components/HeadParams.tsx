interface HeadProps {
    title: string
}

const Heading = ({title}: HeadProps) => {
    return (
        <>
            <title>{title}</title>
        </>
    )
}

export default Heading