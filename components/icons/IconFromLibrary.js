import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function IconFromLibrary() {
  return (
    <>
      <FontAwesomeIcon icon={['fab', 'twitter']} />
      <FontAwesomeIcon icon="fa-search" />
      <FontAwesomeIcon icon={["fab", "github"]} />
      <FontAwesomeIcon icon='faSearch'/>
    </>
  )
}