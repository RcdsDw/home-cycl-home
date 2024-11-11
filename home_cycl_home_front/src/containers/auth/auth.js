import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Tabs, Card, message } from "antd";

import { authLogin, authRegister } from "../../actions/auth";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const nav = useNavigate();

  const onFinishLogin = (values) => {
    authLogin(values)
      .then((res) => {
        message.success(`Connecté`)
        nav('/dashboard', { state: { userId: res.user.id } })
      })
      .catch(() => {
        message.error("Identifiants invalides")
      })
  };

  const onFinishRegister = (values) => {
    authRegister(values)
    .then((res) => {
      message.success(`Enregistré`)
      nav('/dashboard', { state: { userId: res.user.id } })
    })
    .catch(() => {
      message.error("Erreur ?")
    })
  };

  const onFinishFailed = (info) => {
    message.error(`Erreur lors de ${info}`)
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", marginTop: "200px" }}>
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
        {/* Onglet Se connecter */}
        <Tabs.items tab="Se connecter" key="login">
          <Form
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinishLogin}
            onFinishFailed={() => onFinishFailed("la connexion")}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Entrez votre adresse email.' },
                { type: "email", message: 'Entrez une adresse email valide.' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[{ required: true, message: 'Entrez votre mot de passe.' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Se connecter
              </Button>
            </Form.Item>
          </Form>
        </Tabs.items>

        {/* Onglet S'enregistrer */}
        <Tabs.items tab="S'enregistrer" key="register">
          <Form
            name="register"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinishRegister}
            onFinishFailed={() => onFinishFailed("l'enregistrement")}
            autoComplete="off"
          >
            <Form.Item
              label="Prénom"
              name="firstname"
              rules={[{ required: true, message: 'Entrez votre prénom.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nom"
              name="lastname"
              rules={[{ required: true, message: 'Entrez votre nom.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Entrez votre adresse email.' },
                { type: "email", message: 'Entrez une adresse email valide.' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[{ required: true, message: 'Entrez votre mot de passe.' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirmer le mot de passe"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Confirmez votre mot de passe.' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Les mots de passe ne sont pas identiques.'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                S'enregistrer
              </Button>
            </Form.Item>
          </Form>
        </Tabs.items>
      </Tabs>
    </Card>
  );
}