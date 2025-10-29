import {DocumentBuilder} from "@nestjs/swagger";

export function getSwaggerConfig() {
    return new DocumentBuilder()
        .setTitle('Nest auth API')
        .setDescription('The nest auth API description')
        .setContact('Nikita Chicherin', '', 'nickita.rom@gmail.com')
        .addBearerAuth()
        .setVersion('1.0.0').build();
}