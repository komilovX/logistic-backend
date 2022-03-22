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
import { ContainerTypeController } from './container-type/container-type.controller';
import { ContainerTypeService } from './container-type/container-type.service';
import { ContainerType } from './entities/container-type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    Agent, 
    Incoterm, 
    Client, 
    Consignee, 
    ContainerType
  ])],
  controllers: [
    AgentController,
    IncotermController,
    ClientController,
    ConsigneeController,
    ContainerTypeController,
  ],
  providers: [IncotermService, AgentService, ClientService, ConsigneeService, ContainerTypeService],
})
export class HandbookModule {}
