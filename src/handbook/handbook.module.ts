import { Module } from '@nestjs/common'
import { AgentController } from './agent/agent.controller'
import { AgentService } from './agent/agent.service'
import { IncotermController } from './incoterm/incoterm.controller'
import { IncotermService } from './incoterm/incoterm.service'
import { ClientController } from './client/client.controller'
import { ClientService } from './client/client.service'
import { ConsigneeController } from './consignee/consignee.controller'
import { ConsigneeService } from './consignee/consignee.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Agent } from './entities/agent.entitiy'
import { Incoterm } from './entities/incoterm.entity'
import { Client } from './entities/client.entity'
import { Consignee } from './entities/consignee.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Incoterm, Client, Consignee])],
  controllers: [
    AgentController,
    IncotermController,
    ClientController,
    ConsigneeController,
  ],
  providers: [IncotermService, AgentService, ClientService, ConsigneeService],
})
export class HandbookModule {}
