import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

export async function GET() {
  try {
    // 读取配置文件
    const configPath = path.join(process.cwd(), 'content/site-config.md')
    const fileContent = fs.readFileSync(configPath, 'utf8')
    
    // 提取 YAML 部分
    const yamlContent = fileContent.split('---')[1]
    const config = yaml.parse(yamlContent)

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error loading config:', error)
    return NextResponse.json({ error: 'Failed to load config' }, { status: 500 })
  }
} 