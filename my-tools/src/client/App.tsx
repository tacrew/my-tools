import * as React from "react";
import { useState } from "react";
import { Table, Form, Select, Button, Modal } from "antd";

import { designers } from "./constants/designers";
import { functions } from "./utils/firebase";

const { Option } = Select;
const { Column } = Table;

type Props = {
    detail: any
}

const Details: React.FC<Props> = (props) => {
//    console.log(props.detail);
    const item = props.detail;
    const size = item.sizes.available;
    return (
        <div>
            <h2>{item.details.shortDescription}</h2>
            <div>
                {item.details.description}<br />

                <ul>
                    {
                        item.composition
                            ? <li key="composition">{item.composition[0].value}</li>
                            : null
                    }
                    {
                        item.care.length
                            ? <li key="care">{`${item.care[0].instruction}: ${item.care[0].value}`}</li>
                            : null
                    }
                </ul>

                {`ブランド：${item.designerDetails.name}`}<br />
                {item.designerDetails.description}
            </div>
            <ul>
                <li key="brand">{`ブランド：${item.designerDetails.name}`}</li>
                <li key="colors">{`カラー：${item.details.colors}`}</li>
                <li key="sizes">
                    サイズ：
                    <ul>
                        {Object.keys(size).map((s: any) => <li key={size.sizeId}>{`${size[s].description}: ${size[s].quantity}個`}</li>)}
                    </ul>
                </li>
                <li key="shop">{`ショップ：${item.shippingInformations.details.default.countryCode}`}</li>
                <li key="item-url">{`https://www.farfetch.com${item.designerDetails.link.href}`}</li>
            </ul>
            <div>
                {item.images.main.map((image: any, index:number) => <img key={index} src={image.medium}/>)}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [items, setItems] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        const result = await functions.httpsCallable("getItems")({ gender: values.gender, designer: values.designer });
        setLoading(false);
        setItems(result.data);
        //        console.log(result.data);
    };

    return (
        <div style={{ padding: "2em 5% 0" }}>
            <Form
                className="search-form"
                form={form}
                name="search-form"
                layout="inline"
                onFinish={onFinish}
            >
                <Form.Item name="gender" style={{ width: "80px" }}>
                    <Select placeholder="men" defaultActiveFirstOption>
                        <Option key="men" value="men">men</Option>
                        <Option key="women" value="women">women</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="designer" style={{ width: "150px" }}>
                    <Select placeholder="brand">
                        {Object.keys(designers).map((designer: string) => <Option key={designers[designer]} value={designers[designer]}>{designer}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button className="search-button" htmlType="submit" type="primary" block loading={loading}>
                        <strong>Search Items</strong>
                    </Button>
                </Form.Item>
            </Form>

            <Table
                dataSource={items.filter((item:any) => item.priceInfo.finalPrice >= 28000)}
                pagination={false}
                size="small"
                style={{ padding: "1em 0" }}
                rowKey={record => record.id}
                showSorterTooltip={false}
                bordered={true}
                scroll={{ x: true, y: window.innerHeight * 0.8 }}
            >
                <Column
                    title="item"
                    dataIndex="shortDescription"
                    key="shortDescription"
                    align="center"
                    width={500}
                />
                <Column
                    title="sale"
                    dataIndex="priceInfo"
                    key="sale"
                    align="center"
                    filters={[{ text: "Sale", value: "Sale" }]}
                    onFilter={(value: any, record: any) => record.priceInfo.isOnSale}
                    render={(priceInfo: any) => priceInfo.isOnSale ? "Sale" : ""}
                    width={80}
                />
                <Column
                    title="purchase price"
                    dataIndex="priceInfo"
                    key="purchasePrice"
                    align="right"
                    render={(priceInfo: any) => priceInfo.formattedFinalPrice}
                    width={100}
                />
                <Column
                    title="selling price"
                    dataIndex="priceInfo"
                    key="sellingPrice"
                    align="right"
                    render={(priceInfo: any) => Math.round(priceInfo.finalPrice * 1.127 + 2000)}
                    width={100}
                />
                <Column
                    title="profit"
                    dataIndex="priceInfo"
                    key="profit"
                    align="right"
                    sorter={(a: any, b: any) => a.priceInfo.finalPrice - b.priceInfo.finalPrice}
                    render={(priceInfo: any) => Math.round(priceInfo.finalPrice * 0.127 + 2000)}
                    width={100}
                />
                <Column
                    title="stock"
                    dataIndex="stockTotal"
                    key="stockTotal"
                    align="right"
                    width={80}
                />
                <Column
                    title="size"
                    dataIndex="availableSizes"
                    key="availableSizes"
                    align="center"
                    render={(availableSizes: Array<any>) => availableSizes ? availableSizes.map(s => s.size).join() : ""}
                    width={80}
                />
                <Column
                    title="url"
                    dataIndex="url"
                    key="url"
                    align="center"
                    render={(url: string) => <a href={`https://www.farfetch.com${url}`}>Link</a>}
                    width={80}
                />
                <Column
                    title="image"
                    dataIndex="images"
                    key="images"
                    align="center"
                    render={(images: any) => {
                        const [visible, setVisible] = useState(false);
                        return (
                            <div>
                                <Button size="small" onClick={() => setVisible(true)} >image</Button>
                                <Modal
                                    visible={visible}
                                    footer={null}
                                    onCancel={() => setVisible(false)}
                                    bodyStyle={{ textAlign: "center" }}
                                >
                                    <img src={images.cutOut} />
                                </Modal>
                            </div>
                        );
                    }}
                />
                <Column
                    title="details"
                    dataIndex="id"
                    key="id"
                    align="center"
                    render={(id: number) => {
                        const [fetching, setFetching] = useState(false);
                        const [visible, setVisible] = useState(false);
                        const [detail, setDetail] = useState({});

                        const onClick = async () => {
                            setFetching(true);
                            const result = await functions.httpsCallable("test")({ itemId: id });
                            setDetail(result.data);
                            setFetching(false);
                            setVisible(true);
                        };

                        return (
                            <div>
                                <Button size="small" onClick={onClick} loading={fetching}>details</Button>
                                <Modal
                                    visible={visible}
                                    footer={null}
                                    onCancel={() => setVisible(false)}
                                >
                                    <Details detail={detail} />
                                </Modal>
                            </div>
                        );
                    }}
                />
            </Table>

        </div>
    );
};

export default App;
