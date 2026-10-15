import {OmitType, PartialType} from '@nestjs/mapped-types';
import { CreatePerfilDto } from './create-perfil.dto';

export class UpdatePerfilDto extends PartialType(
  OmitType(CreatePerfilDto, ['usuarioId'] as const),
) {}    