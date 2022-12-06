import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonChatMessage } from './entities/lessonChatMessage.entity';
import { LessonChatRoom } from './entities/lessonChatRoom.entity';
import { MatchChatMessage } from './entities/matchChatMessage.entity';
import { MatchChatRoom } from './entities/matchChatRoom.entity';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
export class ChatGateway {
  constructor(
    @InjectRepository(LessonChatMessage)
    private readonly lessonChatMessageRepository: Repository<LessonChatMessage>,

    @InjectRepository(LessonChatRoom)
    private readonly lessonChatRoomRepository: Repository<LessonChatRoom>,

    @InjectRepository(MatchChatMessage)
    private readonly matchChatMessageRepository: Repository<MatchChatMessage>,

    @InjectRepository(MatchChatRoom)
    private readonly matchChatRoomRepository: Repository<MatchChatRoom>,
    private readonly chatService: ChatService,
  ) {}
  @WebSocketServer()
  server: Server;

  player: [];
  @SubscribeMessage('message')
  async connectSomeone(@MessageBody() data: string, @ConnectedSocket() client) {
    const [nickname, writerID, participantID] = data;
    //채팅방 조회
    const preChatRoom = await this.chatService.findOne({ writerID });
  }
}
