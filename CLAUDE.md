# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

gfish-home 项目代码库

## 开发环境

- **操作系统**: Windows 11
- **终端**: PowerShell
- **编码格式**: UTF-8 (无 BOM)

## 开发规范

### 代码规范
- 所有代码必须包含合理的中文注释
- 多含义的业务字段使用字符类型存储，统一走字典管理(dict)维护
- 数据表字段必须包含：id(bigint,自增)、createTime/updateTime(默认当前时间)、createBy/updateBy(默认当前用户id)、delete_flag(字符,默认0)、status(字符,默认1)
- 后端接口统一使用 ApiResponse 封装返回，包含 code、msg、data 字段
- 统一添加 `@HttpCode(HttpStatus.OK)` 确保成功响应返回 HTTP 200

### 数据库操作规范
- Prisma 增删改操作开启事务，注意控制事务粒度
- Prisma 查询操作不开启事务
- 优先使用批量处理避免事务超时
- 数据库变动前必须做好迁移版本记录
- 禁止重置清空数据库

### 前端开发规范
- 表单提交时不要传 createBy/updateBy 字段，由后端拦截器处理
- 前端表单提交按钮需做防抖和 loading 处理
- 错误消息由 axios 拦截器统一处理

### 路由规范
- NestJS 具体路由必须放在通配符路由之前
- 谨慎使用通配符路由避免数据丢失或安全问题

### 通信规范
- 使用中文与用户沟通
- 生成的 bat、sh 脚本不允许出现中文，避免乱码

### 开发原则
- **KISS (简单至上)**: 追求代码和设计的极致简洁
- **YAGNI (精益求精)**: 仅实现当前明确所需的功能
- **SOLID**: 单一职责、开放封闭、里氏替换、接口隔离、依赖倒置
- **DRY (杜绝重复)**: 消除代码或逻辑中的重复模式

## MCP 服务使用

本项目优先使用以下 MCP 服务（按优先级排序）：

1. **Serena** (本地代码分析+编辑)
   - 代码检索、架构分析、符号查找、项目知识管理
   - 首次使用前需检查 check_onboarding_performed
   - 多项目切换使用 activate_project

2. **Context7** (官方文档查询)
   - 框架 API、配置文档、版本差异

3. **Sequential Thinking** (复杂规划)
   - 多步骤任务分解、架构设计

4. **DuckDuckGo** (外部信息)
   - 最新信息、官方公告

## 工具使用

- **禁止使用 `&&` 链接命令**，请分步执行
- 默认前后端项目处于启动状态，未经允许不要随意重启
- 批量文件操作优先使用 MCP Serena 工具而非 bash 命令

## 注意事项

- 不允许随便生成文档，未经明确要求不能生成任何文档
- 公众号文章末尾必须加上：欢迎关注公众号FishTech Notes，一块交流使用心得
