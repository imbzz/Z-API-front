import { PageContainer } from '@ant-design/pro-components';

import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions,Input, Form, message} from "antd";
import {
  getInterfaceInfoVOByIdUsingGET, invokeInterfaceInfoUsingPOST,
} from "@/services/swagger/interfaceInfoController";
import {useParams} from "react-router";


const Index: React.FC = () => {

  //使用useState 控制加载状态
  const [loading, setLoading] = useState(false);
  //列表数据
  const [data, setData] = useState<API.InterfaceInfoVO>();
  //测试返回数据
  const [invokeRes, setInvokeRes] = useState<any>();
  //加载状态
  const [invokeLoading,setInvokeLoading] = useState(false);


  //使用useMath钩子当前URL与指定的路径模式/inferface_info/:id 进行匹配
  const param = useParams();
  //定义异步加载数据和函数
  // 定义异步加载数据的函数
  const loadData = async () => {
    //检测动态路由的参数是否存在
    if(!param.id){
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try{
      //设置加载状态
      //根据id请求数据
      const res = await getInterfaceInfoVOByIdUsingGET({
        id: param.id
      });
      console.log(res)

      //setData设置数据
      setData(res.data);
      //处理错误
      //设置加载状态
    }catch(error: any){
      message.error('请求失败'+ error.message);
    }
   setLoading(false);
  };

  const onFinish = async (values: any) => {
    // 检查是否存在接口id
    if (!param.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      // 发起接口调用请求，传入一个对象作为参数，这个对象包含了id和values的属性，
      // 其中，id 是从 params 中获取的，而 values 是函数的参数
      const res = await invokeInterfaceInfoUsingPOST({
        id: param?.id,
        ...values,
      });
      setInvokeRes(res.data)
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  useEffect(()=>{
    //页面加载后调用加载数据函数
    loadData();
  },[])


  return (
    <PageContainer title={"查看接口文档"}>
      <Card>
        { data ? (
        <Descriptions title={data?.name} column={1}>
          <Descriptions.Item label="接口状态">{data?.status === 1 ? '启用' : '禁用' } </Descriptions.Item>
          <Descriptions.Item label="描述">{data?.description}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{data?.url}</Descriptions.Item>
          <Descriptions.Item label="请求方法">{data?.method}</Descriptions.Item>
          <Descriptions.Item label="请求头">{data?.requestHeader}</Descriptions.Item>
          <Descriptions.Item label="响应头">{data?.responseHeader}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data?.createTime}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{data?.updateTime}</Descriptions.Item>
        </Descriptions>
        ) : (
        <>接口不存在</>
        )}
      </Card>

      <Card>
        {/* 创建一个表单,表单名称为"invoke",布局方式为垂直布局,当表单提交时调用onFinish方法 */}
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          {/* 创建一个表单项,用于输入请求参数,表单项名称为"userRequestParams" */}
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </Form.Item>
          {/* 创建一个包裹项,设置其宽度占据 16 个栅格列 */}
          <Form.Item wrapperCol={{ span: 16 }}>
            {/* 创建调用按钮*/}
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
