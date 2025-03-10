"use client";

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  // 生成密码的函数
  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  };

  // 复制密码到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 当选项改变时重新生成密码
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>密码生成器</CardTitle>
        <CardDescription>生成安全、随机的密码</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">生成的密码</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={copyToClipboard}
              className="h-8 px-2 text-xs"
            >
              <Copy className="h-3.5 w-3.5 mr-1" />
              {copied ? "已复制!" : "复制"}
            </Button>
          </div>
          <Input 
            id="password" 
            value={password} 
            readOnly 
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="length">密码长度: {length[0]}</Label>
          </div>
          <Slider
            id="length"
            min={6}
            max={32}
            step={1}
            value={length}
            onValueChange={setLength}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">包含大写字母</Label>
            <Switch
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="numbers">包含数字</Label>
            <Switch
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="symbols">包含特殊字符</Label>
            <Switch
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={setIncludeSymbols}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generatePassword} className="w-full">
          重新生成密码
        </Button>
      </CardFooter>
    </Card>
  );
} 