import { PageContainer } from '@ant-design/pro-components';

import React, {useEffect, useState} from 'react';
import {List, message} from "antd";
import {listInterfaceInfoVOByPageUsingPOST} from "@/services/swagger/interfaceInfoController";


const Index: React.FC = () => {

  //使用useState 控制加载状态
  const [loading, setLoading] = useState(false);
  //列表数据
  const [list, setList] = useState<API.InterfaceInfoVO[]>([]);
  //总数
  const [total, setTotal] = useState<number>(0);
  //页面大小
  const PAGE_SIZE = 5;
  //定义异步加载数据和函数
  // 定义异步加载数据的函数
  const loadData = async (current = 1, pageSize = PAGE_SIZE) => {
    // 开始加载数据，设置 loading 状态为 true
    setLoading(true);
    try {
      // 调用接口获取数据
      const res = await listInterfaceInfoVOByPageUsingPOST({
        current,
        pageSize,
      });
      // 将请求返回的数据设置到列表数据状态中
      setList(res?.data?.records ?? []);
      // 将请求返回的总数设置到总数状态中
      setTotal(res?.data?.total ?? 0);
      // 捕获请求失败的错误信息
    } catch (error: any) {
      // 请求失败时提示错误信息
      message.error('请求失败，' + error.message);
    }
    // 数据加载成功或失败后，设置 loading 状态为 false
    setLoading(false);
  };

  useEffect(()=>{
    //页面加载后调用加载数据函数
    loadData();
  },[])


  return (
    <PageContainer title={"在线接口平台"}>
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        //将数据传递到List
        dataSource={list}
        //渲染每个列
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return (
          <List.Item
            actions={[<a key={item.id} href={apiLink}>查看</a>]}>
            <List.Item.Meta
              // href等会要改成接口文档的链接
              title={<a href={apiLink}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        );
        }}
        // 分页配置
        pagination={{
          // 自定义显示总数
          // eslint-disable-next-line @typescript-eslint/no-shadow
          showTotal(total: number) {
            return '总数：' + total;
          },
          // 每页显示条数
          pageSize: PAGE_SIZE,
          // 总数，从状态中获取
          total,
          // 切换页面触发的回调函数
          onChange(page, pageSize) {
            // 加载对应页面的数据
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
