import { Content } from 'components/content'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

const AddPostStyles = styled.div``

const UpdatePost = () => {
  const [params] = useSearchParams()
  const postId = params.get('id')
  return (
    <DashboardLayout>
      <AddPostStyles>
        <Content title="Update Post" desc={`Update your post information id : ${postId}`}></Content>
      </AddPostStyles>
    </DashboardLayout>
  )
}

export default UpdatePost
