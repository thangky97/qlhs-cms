import { FormattedMessage } from 'react-intl';
import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/action';
import validateOptions from './../../../../../constants/validate'
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import draftToHtml from 'draftjs-to-html';
const SidebarAdd = ({ open, toggleSidebar ,disable,setDisable}) => {
  const lang = useSelector(state => state.common.language)
  const dispatch = useDispatch()
  const store = useSelector((state) => state.abouts);
  const [introLocal, setIntroLocal] = useState(EditorState.createEmpty());
  const [introCloud, setIntroCloud] = useState(EditorState.createEmpty());
  const [valueFooter_text, setvalueFooter_text] = useState(
    EditorState.createEmpty()
  );
  const { register, errors, handleSubmit } = useForm()
  const ProductOptions = validateOptions.ProductOptions;

 
  const AboutOptions = validateOptions.AboutOptions
  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = values => {
    if (isObjEmpty(errors)) {

      setDisable(true)
      dispatch(
        add({ ...values, lang,address_1:values?.address_1||" ",address_2:values?.address_2||" ",
        })
      )
    }
  } 


  return (
    <Sidebar
      size='lg'
      open={open}
      title={<FormattedMessage id="New About" />}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='about'>
            <FormattedMessage id="about title" />
             {/* <span className='text-danger'>*</span> */}
          </Label>
          <Input
            name='about'
            id='about'
            placeholder=''
            innerRef={register(AboutOptions.about)}
            onBlur={() => {
              let about1 = document.getElementById("about");
              if (about1 && about1.value) {
                about1.value = about1.value.trim();
              }
            }}
            className={classNames({ 'is-invalid': errors['about'] })}
          />
          <small className="text-danger">
            {errors?.about && errors.about.message}
          </small>
        </FormGroup>
  
        <FormGroup>
          <Label for='address_1'>
            <FormattedMessage id="Address 1" /> <span className='text-danger'></span>
          </Label>
          <Input
            name='address_1'
            id='address_1'
            type="textarea"
            placeholder=''
            innerRef={register(AboutOptions.address_1)}
            onBlur={() => {
              let address1 = document.getElementById("address_1");
              if (address1 && address1.value) {
                address1.value = address1.value.trim();
              }
            }}
            className={classnames({ 'is-invalid': errors['address_1'] })}
          />
          <small className="text-danger">
            {errors?.address_1 && errors.address_1.message}
          </small>
        </FormGroup>
        <FormGroup>
          <Label for='address_2'>
            <FormattedMessage id="Address 2" /> <span className='text-danger'></span>
          </Label>
          <Input

            name='address_2'
            id='address_2'
            type="textarea"

            innerRef={register(AboutOptions.address_2)}
            onBlur={() => {
              let address2 = document.getElementById("address_2");
              if (address2 && address2.value) {
                address2.value = address2.value.trim();
              }
            }}
            className={classnames({ 'is-invalid': errors['address_2'] })}
          />
          <small className="text-danger">
            {errors?.address_2 && errors.address_2.message}
          </small>
        </FormGroup>
      
        <div style={{ textAlign: "end" }}>

          <Button type='submit' className='mr-1' color='primary' disabled={disable}>

            <FormattedMessage id="add" />
          </Button>
          <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
            <FormattedMessage id="Cancel" />
          </Button>
        </div>
      </Form>
    </Sidebar>
  )
}

export default SidebarAdd