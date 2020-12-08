import * as alt from 'alt-server';
import * as chat from 'chat';

// list of voice ranges in meter
const rangeArray = [5, 10, 20];

// index of default range
const defaultRange = 1;

let channelShort = new alt.VoiceChannel(true, rangeArray[0]); 
let channelMedium = new alt.VoiceChannel(true, rangeArray[1]); 
let channelLong = new alt.VoiceChannel(true, rangeArray[2]);

function changeVoiceChannel(index, player)
{
    channelShort.mutePlayer(player);
    channelMedium.mutePlayer(player);
    channelLong.mutePlayer(player);

    if(index == 0)
        channelShort.unmutePlayer(player);
    if(index == 1)
        channelMedium.unmutePlayer(player);
    if(index == 2)
        channelLong.unmutePlayer(player);
    
    chat.send(player, "{80eb34}Ses Mesafesi {34dfeb}"+ rangeArray[index] +"{80eb34}m olarak değiştirildi");
}

alt.on('playerConnect', (player) => {
    channelShort.addPlayer(player);
    channelMedium.addPlayer(player);
    channelLong.addPlayer(player);

    chat.send(player, "{80eb34}Mevcut sesli yardım komutları görmek için {34dfeb}/voice {80eb34}yazın.");

    player.setMeta("voice:rangeIndex", defaultRange);
    changeVoiceChannel(defaultRange, player);
});

alt.on('playerDisconnect', (player, reason) => {
    channelShort.removePlayer(player);
    channelMedium.removePlayer(player);
    channelLong.removePlayer(player);
});


alt.onClient("voice:rangeChanged", (player, args) => {
    
    let index = player.getMeta("voice:rangeIndex");
    index++;

    if(index >= rangeArray.length)
        index = 0;

    changeVoiceChannel(index, player);
    player.setMeta("voice:rangeIndex", index);
});

// =============================== Commands Begin ==================================================

chat.registerCmd("voice", function (player, args) {
    if(args.length == 0)
    {
        chat.send(player, "{ff0000}========== {eb4034}VOICE YARDIM{ff0000} ==========");
        chat.send(player, "{ff0000}= {34abeb}/voice {ffffff} - Bu yardımı gösterir.");
        chat.send(player, "{ff0000}= {ffffff}Tuş ile ses mesafenizi değiştirebilirsiniz \"F1\"");
        chat.send(player, "{ff0000}= {ffffff}Mikrofonunuzu varsayılan olarak ayarlamanız gerekir.");
        chat.send(player, "{ff0000}= {ffffff}Alt: V'nin Ana menüsünde PushToTalk'a geçebilirsiniz.");
        chat.send(player, "{ff0000}= {ffffff}GTA ayarlarında voice chat etkinleştirmeniz gerekir.");
        chat.send(player, "{ff0000} ========================");
    }
});

// =============================== Commands End ====================================================