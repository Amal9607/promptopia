import ProfileContent from "@/components/ProfileContent"

const page = ({ params }) => {

    return (
        <ProfileContent id={params.id} />
    )
}
export default page