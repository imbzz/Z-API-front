import {
  ActionType,
  ProColumns,
  ProFormDateTimePicker, ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea, ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect} from 'react';


export type Props = {
  //表单需要编辑的数据
  values: API.InterfaceInfoVO;
  //表格的列定义
  columns: ProColumns<API.InterfaceInfoVO[]>;
  //当用户点击取消时触发
  onCancel: () => void;
  //当用户提交时触发
  onSubmit: (value: API.InterfaceInfoVO) => Promise<void>;
  //是否显示编辑表单
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {

  //从Props获取数据
  const { values,columns,onCancel,onSubmit,visible } = props;
  // 使用react 的useRef创建一个引用,以访问ProTable的表单实例
  const formRef = React.useRef<ProFormInstance>();

  //防止修改的表单内容一直是同一个内容，要监听values的变化
  //使用React的userEffect的值变更表单的值
  useEffect(()=>{
    if(formRef){
      formRef.current?.setFieldsValue(values);
    }
  },[values]);
  return (
   <Modal visible={visible} footer={null} onCancel={()=>onCancel?.()}>
     {
       <ProTable
         type="form"
         formRef={formRef}
         columns={columns}
         onSubmit={async (values)=>{
           onSubmit?.(values);
         }}
       />
     }
   </Modal>
  );
};
export default UpdateModal;
