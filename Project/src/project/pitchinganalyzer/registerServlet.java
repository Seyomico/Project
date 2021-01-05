package project.pitchinganalyzer;

import java.io.IOException;
import java.io.PrintWriter;

import java.util.List;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

@WebServlet("/project/pitchinganalyzer/register")
public class registerServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
		// ServletContext context = this.getServletContext();
		// Pitcher pitcher = (pitcher) context.getAttribute("GameData");
		// if (pitcher == null) {
		// 	pitcher = new Pitcher();
		// 	context.setAttribute("Pitcher", pitcher);
		// }
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		Pitcher pitcher = new Pitcher();

		//受け取り
		String data = request.getParameter("send_data");
		//受け取ったデータをjsonとして作成
		JSONObject jsonObject = new JSONObject(data);

		//キーを引数にすることで指定可能
		String name = jsonObject.getString("pitcherName");
		String dexterity = jsonObject.getString("dominant_hand");
		String form = jsonObject.getString("form");

		//変化球は一旦リストにしてから配列に変換
		List<String> list = new ArrayList<String>();

		for (int i = 0;i < 10 ; i++) {
			if (jsonObject.has("variety" + i) ){
				list.add(jsonObject.getString("variety" + i)) ;
			}
		}

		String[] ballType = list.toArray(new String[0]);


		// String name = request.getParameter("pitcherName");
		// String dexterity = request.getParameter("dominant_hand");
		// String form  = request.getParameter("form");
		// String[] ballType = request.getParameterValues("variety");
		String json;

		if(pitcher.registerPitcher(name, dexterity, form, ballType)){
			session.setAttribute("UserName",name);
			StringBuilder builder = new StringBuilder();
			builder.append("true");
			json = builder.toString();
			System.out.println(json);
		}
		else{
			StringBuilder builder = new StringBuilder();
			builder.append("false");
			json = builder.toString();
			System.out.println(json);
		}

		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		writer.append(json);
		writer.flush();
	}
}
