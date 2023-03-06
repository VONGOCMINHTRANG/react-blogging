import { Button } from 'components/button'
import Content from 'components/content/Content'
import { Field } from 'components/field'
import { Input, InputPasswordToggle } from 'components/input'
import { Label } from 'components/label'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const UpdateUserStyles = styled.div`
  .hidden-input {
    clip: rect(0 0 0 0);
    border: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  .button {
    width: 200px;
  }
  @media (max-width: 767px) {
    .form-layout {
      display: flex;
      flex-direction: column;
      margin-bottom: 0px;
    }
  }
`

const UpdateUser = () => {
  const handleUpdateUser = (values) => {
    console.log(values)
  }
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm()

  return (
    <DashboardLayout>
      <UpdateUserStyles>
        <Content title="Account Information" desc="Update your account information"></Content>
        <form>
          <div className="form-layout">
            <Field>
              <Label htmlFor="fullname">Fullname</Label>
              <Input
                control={control}
                name="name"
                type="text"
                placeholder="Enter your fullname"
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="username">Username</Label>
              <Input
                control={control}
                name="username"
                type="text"
                placeholder="Enter your username"
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label htmlFor="dateofbirth">Date of Birth</Label>
              <Input
                control={control}
                name="dateofbirth"
                type="text"
                placeholder="dd/mm/yy"
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                control={control}
                name="phone"
                type="tel"
                placeholder="Enter your mobile number"
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                control={control}
                name="email"
                type="email"
                placeholder="Enter your email address"
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <InputPasswordToggle control={control}></InputPasswordToggle>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label htmlFor="avatar">Avatar</Label>
              <label className="cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg h-[250px] shadow-lg relative overflow-hidden group">
                <Input name="image" control={control} type="file" className="hidden-input"></Input>
                <div className="image-content">
                  <img src="/upload-img.png" alt="upload-img" className="max-w-[80px] mb-5" />
                  <p className="font-semibold">Choose photo</p>
                </div>
              </label>
            </Field>
          </div>
          <Button
            type="submit"
            onClick={handleSubmit(handleUpdateUser)}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Add category
          </Button>
        </form>
      </UpdateUserStyles>
    </DashboardLayout>
  )
}

export default UpdateUser
