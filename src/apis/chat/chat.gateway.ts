import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonChatMessage } from './entities/lessonChatMessage.entity';
import { LessonChatRoom } from './entities/lessonChatRoom.entity';
import { MatchChatMessage } from './entities/matchChatMessage.entity';
import { MatchChatRoom } from './entities/matchChatRoom.entity';

// @WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
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
  ) {}
}
